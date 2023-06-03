export const API_RESPONSE = {
  status: '',
  message: '',
  date: new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(new Date()),
  data: []
}

export const API_FAIL_RESPONSE = {
  ...API_RESPONSE,
  status: 'fail',
  type: ''
}

export const API_OK_RESPONSE = {
  ...API_RESPONSE,
  status: 'ok'
}
