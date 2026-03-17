if (sessionStorage.getItem('auth') === 'ok') {
  document.getElementById('pw-overlay').style.display = 'none';
}
document.getElementById('pw-btn').addEventListener('click', function() {
  var pw = document.getElementById('pw-input').value;
  if (pw === 'innoup3334') {
    sessionStorage.setItem('auth', 'ok');
    document.getElementById('pw-overlay').style.display = 'none';
  } else {
    document.getElementById('pw-error').textContent = '비밀번호가 틀렸습니다.';
  }
});
document.getElementById('pw-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') document.getElementById('pw-btn').click();
});
