export default class SnackService {
  data = {
    timeout: 6000,
    color: 'primary',
    mode: null,
    text: null,
    open: false,
  }

  notifiy(text, color, timeout) {
    this.data.text = text;
    this.data.color = color || 'primary';
    this.data.timeout = timeout || 6000;
    this.data.open = true;
  }

  success(text) {
    this.notifiy(text, 'success');
  }

  warn(text) {
    this.notifiy(text, 'warning');
  }

  error(text) {
    this.notifiy(text, 'error');
  }

  info(text) {
    this.notifiy(text, 'info');
  }
}
