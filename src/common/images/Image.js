import { Record } from '../_tools/transit';

const Artist = Record({
  _id: '',
  title: '',
  url: '',
  fav: false,
}, 'image');

export default Artist;
