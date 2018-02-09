export default class SnackService {
  data = {
    timeout: 6000,
    color: 'primary',
    mode: null,
    text: null,
    open: false,
  }

  notify(text, color, timeout) {
    this.data.text = text;
    this.data.color = color;
    this.data.timeout = timeout;
    this.data.open = true;
  }

  primary(text) {
    this.notify(text, 'primary');
  }

  success(text) {
    this.notify(text, 'success');
  }

  warn(text) {
    this.notify(text, 'warning');
  }

  error(text) {
    this.notify(text, 'error');
  }

  info(text) {
    this.notify(text, 'info');
  }
}
