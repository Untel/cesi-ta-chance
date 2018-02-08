export default class ModalService {
  data = {
    opened: false,
    next: null,
    cancel: null,
    password: {
      value: null,
      isVisible: false,
    }
  }
}
