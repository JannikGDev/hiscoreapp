


export const GetRepetitionString = (repetitionIndex) => {

    switch(repetitionIndex) {
        case 0:
            return "Einmalig";
        case 1:
            return "Täglich";
        case 2:
            return "Wöchentlich";
        case 3:
            return "Monatlich";
        case 4:
            return "Jährlich";
        case 5:
            return "???";
    }
}

export const GetQuestRewardExp = (quest) => {

    let string = "";

    if(quest.experience > 0) {
        string = quest.experience + " EXP"
    }

    return string;
}

export const GetQuestRewardMultiplier = (quest) => {

    let string = "";

    if(quest.expMultiplier > 1.0) {
        string += "x " + quest.expMultiplier;
    }

    return string;
}