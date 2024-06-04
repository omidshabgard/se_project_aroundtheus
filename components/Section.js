class Section {
	constructor({ items, renderer }, cardContainerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._cardContainerSelector = cardContainerSelector;
	}

	renderItems() {
		this._items.forEach((item) => {
			this._renderer(item);
		});
	}

	addItem(element) {
		const container = document.querySelector(this._cardContainerSelector);
		container.append(element);
	}
}

export default Section;
