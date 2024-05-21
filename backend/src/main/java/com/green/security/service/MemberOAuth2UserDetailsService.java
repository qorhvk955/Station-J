package com.green.security.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.green.entity.Member;
import com.green.repository.MemberRepository;
import com.green.repository.RoleRepository;
import com.green.security.dto.AuthMemberDTO;
import com.green.security.dto.AuthMemberDetails;
import com.green.security.dto.GoogleAuthDTO;
import com.green.security.dto.KakaoAuthDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberOAuth2UserDetailsService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		String clientName = userRequest.getClientRegistration().getClientName();
		System.out.println(clientName);
		
		AuthMemberDTO authMemberDTO = null;
		
		OAuth2User oAuth2User = super.loadUser(userRequest);
		if(clientName.equals("Google")) {
			authMemberDTO = new GoogleAuthDTO(oAuth2User.getAttributes());
		}else if(clientName.equals("Kakao")) {
			authMemberDTO = new KakaoAuthDTO(oAuth2User.getAttributes());
		}

		// 디버깅용
		System.out.println(authMemberDTO);
		System.out.println(authMemberDTO.getEmail());
		System.out.println(authMemberDTO.getProvider());
		System.out.println(authMemberDTO.getProviderId());

		Member member = saveSocialMember(authMemberDTO);
		System.out.println("가입된 회원 넘버 : " + member.getNum()
							+ "권한 : " + member.getRoleSet().toString()
							);
		AuthMemberDetails authMember = new AuthMemberDetails(
															member.getNum(),
															member.getId(),
															member.getPassword(),
															member.getNickName(),
															member.getEmail(),
															true,
															member.getRoleSet().stream().map((role)->
															new SimpleGrantedAuthority("ROLE_" + role.getRole().getRoleName()))
															.collect(Collectors.toSet()),
															oAuth2User.getAttributes()
															);
		System.out.println("인가완료, 권한");
		return authMember;
	}

	
	private Member saveSocialMember(AuthMemberDTO authMemberDTO) {
		Optional<Member> result = memberRepository.findByEmail(authMemberDTO.getEmail(), true);
		if(result.isPresent()) {
			return result.get();
		}
		Member member = Member.builder()
									.email(authMemberDTO.getEmail())
									.id(authMemberDTO.getProvider() + "_" + authMemberDTO.getProviderId())
									.password(passwordEncoder.encode("socialPW"))
									.fromSocial(true)
									.build();
		member.addRole(roleRepository.findByRoleName("USER").orElse(null));
		memberRepository.save(member);
		return member;
	}
	
}
