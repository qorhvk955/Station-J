export function roleSelector(roleSet) {
    const rolePriority = {
        "ADMIN": 4,
        "SUBADMIN": 3,
        "STAFF": 2,
        "USER": 1
    };

    // 배열 내 가장 높은 우선 순위의 권한 찾기
    let highestRole = "권한 없음";  // 기본값 설정
    let maxPriority = 0;

    for (let role of roleSet) {
        if (rolePriority[role] && rolePriority[role] > maxPriority) {
            highestRole = role;
            maxPriority = rolePriority[role];
        }
    }

    // 최고 권한에 따라 뱃지 세부 정보 반환
    switch (highestRole) {
        case 'ADMIN':
            return { className: "badge bg-soft-primary px-3 py-1", roleName: "최고 관리자" };
        case 'SUBADMIN':
            return { className: "badge bg-soft-success rounded px-3 py-1", roleName: "준 관리자" };
        case 'STAFF':
            return { className: "badge bg-soft-danger rounded px-3 py-1", roleName: "게시판 관리자" };
        case 'USER':
            return { className: "badge bg-soft-danger rounded px-3 py-1", roleName: "일반 사용자" };
        default:
            return { className: "", roleName: "권한 없음" };
    }
}