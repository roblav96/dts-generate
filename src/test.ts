import '.'
import * as _ from 'lodash'

process.nextTick(() => global.dts(MOCK, `MOCK`))

const MOCK = {
	movie: {
		adult: false,
		backdrop_path: '/wPRiV4TVpRCV2es81q0S1eRaUbm.jpg',
		belongs_to_collection: {
			backdrop_path: '/sQNiamRBTh2aTjQ8aYCJ69MngTM.jpg',
			id: 325470,
			name: 'The Lego Movie Collection',
			poster_path: '/qwuwukEjuh6Zs51NnhtPVriARey.jpg',
		},
		budget: 60000000,
		certification: 'PG',
		comment_count: 63,
		country: 'us',
		genres: [
			{ id: 12, name: 'Adventure' },
			{ id: 16, name: 'Animation' },
			{ id: 35, name: 'Comedy' },
			{ id: 10751, name: 'Family' },
			{ id: 14, name: 'Fantasy' },
		],
		homepage: 'http://www.thelegomovie.com',
		id: 137106,
		ids: { imdb: 'tt1490017', slug: 'the-lego-movie-2014', tmdb: 137106, trakt: 92226 },
		imdb_id: 'tt1490017',
		language: 'en',
		original_language: 'en',
		original_title: 'The Lego Movie',
		overview:
			'An ordinary Lego mini-figure, mistakenly thought to be the extraordinary MasterBuilder, is recruited to join a quest to stop an evil Lego tyrant from gluing the universe together.',
		popularity: 14.539,
		poster_path: '/lMHbadNmznKs5vgBAkHxKGHulOa.jpg',
		production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
		rating: 7.83248,
		release_date: '2014-02-06',
		released: '2014-02-07',
		revenue: 469160692,
		runtime: 100,
		spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
		status: 'Released',
		tagline: 'The story of a nobody who saved everybody.',
		title: 'The Lego Movie',
		trailer: 'http://youtube.com/watch?v=lPnY2NjSjrg',
		updated_at: '2019-03-19T09:07:55.000Z',
		video: false,
		vote_average: 7.4,
		vote_count: 4698,
		votes: 19431,
		year: 2014,
	},
	score: 479.08286,
}
