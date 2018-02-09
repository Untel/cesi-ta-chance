export default class SnackService {
  data = {
    timeout: 6000,
    color: 'primary',
    mode: null,
    text: null,
    open: false,
  }

  notify(data) {
    Object.keys(data).forEach(k => this.data[k] = data[k]);
    this.data.open = true;
  }

  primary(text) {
    this.notify({text, color: 'primary'});
  }

  success(text) {
    this.notify({text, color: 'success'});
  }

  warn(text) {
    this.notify({text, color: 'warning'});
  }

  error(text) {
    this.notify({text, color: 'error'});
  }

  info(text) {
    this.notify({text, color: 'info'});
  }
}
