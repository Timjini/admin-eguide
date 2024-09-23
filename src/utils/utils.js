export const getAddressDetails = (place) => {
    const addressComponents = place?.address || [];

    const getComponent = (components, type) => {
        const component = components?.find(c => c.types.includes(type));
        return component;
    };

    return {
        street_1: getComponent(addressComponents, "route"),
        street_2: getComponent(addressComponents, "administrative_area_level_4"),
        state: getComponent(addressComponents, "administrative_area_level_2"),
        city: getComponent(addressComponents, "administrative_area_level_1"),
        country: getComponent(addressComponents, "country"),
        postal_code: getComponent(addressComponents, "postal_code"),
        coordinates: place ? { lat: place.lat, lng: place.lng } : null,
    };
};

export const formattedDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: '2-digit' };
    const formatted = new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
    return formatted;
};
