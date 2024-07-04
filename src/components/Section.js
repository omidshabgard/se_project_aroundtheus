class Section {
	constructor({ renderer }, cardContainerSelector) {
		this._renderer = renderer;
		this._container = document.querySelector(cardContainerSelector);
	}

	renderItems(items) {
		items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		this._container.prepend(element);
	}
}

export default Section;
