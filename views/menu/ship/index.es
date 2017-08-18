/* global __ */

export default {
  title: __('Ship'),
  sub: {
    '_name': {
      title: __('By ship name'),
      postprocess: (path, value) => ({
        text: value,
        regex: new RegExp(value),
      }),
      func: (path, value, record) => record.fleet.filter((sh) => {
        let ref
        return value.regex.test((ref = $ships[sh.shipId]) != null ? ref.api_name : void 0)
      }).length !== 0,
      textFunc: (path, value) => __('With ship %s', value.text),
      options: {
        placeholder: __('Enter the ship name here. (Javascript regex is supported.)'),
      },
    },
    '_id': {
      title: __('By ship id'),
      testError: (path, value) => {
        if ((typeof _ships !== "undefined" && _ships !== null ? _ships[value] : void 0) == null) {
          return __('You have no ship with id %s', value)
        }
      },
      func: (path, value, record) => record.fleet.filter((sh) => {
        let ref
        return ((ref = sh.id) != null ? ref.toString() : void 0) === value.toString()
      }).length !== 0,
      textFunc: (path, value) => {
        const name = _ships[value].api_name
        return __('With ship %s (#%s)', name, value)
      },
      options: {
        placeholder: __('Enter the ship id here. You can find it in Ship Girls Info at the first column.'),
      },
    },
  },
}

// ---
// generated by coffee-script 1.9.2
