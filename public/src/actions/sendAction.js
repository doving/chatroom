import TYPE from '../config/ACTIONTYPE';

export default {
	changeFavor(favor) {
		return {
			type: TYPE.CHANGE_FAVOR,
			favor
		}
	}
}