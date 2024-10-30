export interface Participant {
  name: string;
  minutesPlayed: number;
  hourlyFee?: number;
  shuttleFee?: number;
  totalFee?: number;
}

export interface SendData {
  shuttlePrice: number;
  participants: Participant[];
  hourlyRates: number[];
}
