package com.green.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpSocialMemberCommand {

	@NotBlank(message = "닉네임을 입력해주세요.")
	private String nickName;

	@AssertTrue(message = "약관에 동의해야 합니다.")
	private boolean agreement;
}
