const createMenuSection = (defaultSectionId: number) => {
	let sectionId = $state(defaultSectionId);
	return {
		get sectionId() {
			return sectionId;
		},
		set sectionId(value) {
			sectionId = value;
		},
	};
};

export const menuSection = createMenuSection(0);
