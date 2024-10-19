export interface Participant {
  name: string;
  minutesPlayed: number;
}

export interface SendData {
  shuttlePrice: number;
  participants: Participant[];
  hourlyRates: number[];
}