/**
 * All Codes below are Lifetime Warranted by mozat-tomi since 21/6/17.
 */
export const STATE = {
	INIT: 0,
	START_LOOPS: 1,
	STOP_LOOPS: 2,
};

export const LOOPER = {
	INIT_SPEED: 0,
	SPEED: {
		//x : [0,PI/2]
		SPEED_UP_TIME: 5000,
		COEFFICIENT: 0.6,
		MAX_SPEED: 0.6 * 1,
		MIN_SPEED:0.05,
		SPEED_DOWN_TIME:5000
	}
};

export const UI = {
	LOOPER_SIZE: 290,
	AVATAR_SIZE: 36,
	LOOPER_COLORS: [
		'#000000',
		'#fda76e',
		'#ffc26d',
		'#34d939',
		'#73dceb',
		'#3e99d2',
		'#908fef',
		'#d17cfc',
		'#fe89b1',
		'#ff6e6e',
		'#ff5b85' ],
	LINE_IMAGE: {
		WIDTH: 7.5,
		HEIGHT: 128,
	},
};

export const DEBUG_DATA = {
	USER_LIST: [
		{
			name: 'name1',
			avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png',
		},
		{
			name: 'name2',
			avatar: 'https://lh5.googleusercontent.com/-Gq_grbbRHlo/AAAAAAAAAAI/AAAAAAAAAEY/PN3ZUIY_EOw/photo.jpg',
		},
		{
			name: 'name3',
			avatar: 'https://wangsu-image.rings.tv/images/2016/06/21/e1/0/e15afd1da0ec48fcf9ccae66f$e3c59d20160621.jpeg',
		},
		{
			name: 'name4',
			avatar: 'https://wangsu-image.rings.tv/images/2017/02/12/12/__/6ac7114233554d9f9926dd2218bce8b4$bec5bd.jpeg',
		},
		{
			name: 'name5',
			avatar: 'https://wangsu-image.rings.tv/images/2016/12/28/08/__/91f5621d9c48486d866e974f172e6de4$39697f.jpeg',
		},
		{
			name: 'name6',
			avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/25/__/25e67c18df7a2d84404d3dc2f$fbeac920160223.png',
		},
		{
			name: 'name7',
			avatar: 'https://wangsu-image.rings.tv/images/2016/02/23/3b/__/3b1fda4a52c37d57bd4def3ec$fbb2a220160223.png',
		},
		{
			name: 'name8',
			avatar: 'https://wangsu-image.rings.tv/images/2016/08/04/94/0/94f97f538a8541998619213fb$cc1c6420160804.png',
		},
		{
			name: 'name9',
			avatar: 'https://lh5.googleusercontent.com/-VkMI2YkDnrY/AAAAAAAAAAI/AAAAAAAAABA/OqN9wo-lExg/s120/photo.jpg',
		},
		{
			name: 'name10',
			avatar: 'https://wangsu-image.rings.tv/images/2016/06/04/47/__/47d1e65fe0762cc77b6aa09b4$d7c2af20160604.jpeg',
		} ],
};

export const SettingKeys = {
	EntranceFee: 'EntranceFee',
	MaxPlayer: 'MaxPlayer',
};