const blogs = [
  {
    'id': '5b0c337ef4ccb61082cec6c4',
    'content': 'Funktionaalisuus on paradigma.',
    'date':  '2018-05-28T16:51:10.242Z',
    'important': true
  },
  {
    'id': '5b3a6ef3a4169d4918b7d8e9',
    'content': 'Pahimmat kaatuilijat 2018 World Cupissa.',
    'important': true,
    'date': '2018-07-02T18:29:07.270Z',
    'user': '5b36595909c3c25f94ad6732'
  },
  {
    'id': '5b56033d8997f435107340a3',
    'content': 'Ref debuggausta1',
    'important': true,
    'date': '2018-07-23T16:33:01.310Z',
    'user': '5b4ce817f0e3e62fac0bbd19'
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, blogs };
