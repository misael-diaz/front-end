export { random };

const random = () => {
	const min = 1.0;
	const max = 1.0e8;
	const r = min + Math.random() * (max - min);
	return Math.floor(r);
};
