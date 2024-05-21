function formatDate(dateString) {
    const dateParts = dateString.split(' ')[0];  // 공백을 기준으로 날짜 부분만 분리
    return dateParts.split('-').join('.');  // '-'를 '.'으로 변경
}