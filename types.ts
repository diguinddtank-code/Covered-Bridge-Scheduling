export interface MatchResult {
  status: 'success' | 'missing_info' | 'not_eligible' | 'location_unavailable';
  identified_location: 'Gainesville' | 'Euharlee' | 'Marietta' | 'Cumming' | null;
  identified_age: number | null;
  recommended_class_name: string | null;
  recommended_options: string[];
  reply_message_en: string;
  booking_action?: 'show_form' | null;
  class_id?: string | null;
}
