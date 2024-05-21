package com.green.security.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.green.entity.Member;
import com.green.repository.MemberRepository;
import com.green.security.dto.AuthMemberDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberUserDetailsService implements UserDetailsService{
	// 로그인 시 입력받은 데이터로 인증확인 후 UserDetails에 권한 부여(인가)해주기
	
	
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<Member> result = memberRepository.findById(username, false);

		if(!result.isPresent()) {
			// DB에 입력된 username 이 없는 경우
			System.out.println("입력된 유저이름 : " + username);
			System.out.println("유저 없음");
			return null;
		}
		// DB에서 가져온 Member 엔티티 정보를 UserDetails 객체로 만들어주기
		// 이후 provider를 통해 비밀번호 대조 후 인가과정을 거쳐 정보를 계속해서 사용한다.
		
		Member member = result.get();
		System.out.println("--서버에서 가져온 인증데이터--");
		System.out.println(member.getRoleSet().toString());
		
		AuthMemberDetails memberAuth = new AuthMemberDetails(
													member.getNum(),
													member.getId(),
													member.getPassword(),
													member.getNickName(),
													member.getEmail(),
													false,
													member.getRoleSet().stream().map((role)->
														new SimpleGrantedAuthority("ROLE_" + role.getRole().getRoleName()))
														.collect(Collectors.toSet())
													);
		System.out.println("--인가를 위해 만든 memberAuth 확인--");
		System.out.println(memberAuth.toString());
		System.out.println(memberAuth.getAuthorities().stream().collect(Collectors.toList()));
		return memberAuth;
	}

}
