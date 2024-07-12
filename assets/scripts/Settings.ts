type Setting = "nr_players" | "difficulty" | "round_time" | "alarm" | "alarm_loop"

class Settings {

    static getDefault(setting: Setting): any {
        switch (setting) {
            case "nr_players": return 4;
            case "difficulty": return "easy";
            case "round_time": return "120";
            case "alarm": return "alarm_1";
            case "alarm_loop": return "on";
        }
    }

}