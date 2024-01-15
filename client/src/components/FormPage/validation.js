const validation = (input) => {
    const errors = {};

    if (!input.name) {
        errors.name = 'The activity name cannot be empty.';

    } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
        errors.name = "The activity cannot contain special characters.";

    } else if (input.name.length < 3) {
        errors.name = "The activity must be more than 3 characters.";
    } else if (input.name.length > 12) {
        errors.name = "The maximum number of characters is 12.";
    }

    if (!input.difficulty) {
        errors.difficulty = 'Difficulty is required.';
    }

    if (!input.duration) {
        errors.duration = 'Duration is required.';
    }

    if (input.season <= 0) {
        errors.season = 'Season is required.';
    }

    if (input.countries.length < 1) {
        errors.countries = 'At least one country must be selected.';
    } else if (input.countries.length > 5){
        errors.countries = 'You can only choose 5 countries.';
    }
    return errors;
};

export default validation;