import { Character } from '../models';

const character: Character = {
  id: 1,
  name: 'Character 1',
  status: 'active',
  species: 'species 1',
  type: 'string',
  gender: 'string',
  origin: { name: 'origin1', url: 'originurl1' },
  location: { name: 'location1', url: 'location1' },
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

export default character;
