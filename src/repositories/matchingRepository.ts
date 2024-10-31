"use server";

import { UserInfoForMatching } from "@/types/user/UserInfo";
import { createClient } from "@/utils/supabase/server";

export const getUserForMatching = async () => {
  const supabase = createClient();

  const { data: auth } = await supabase.auth.getUser();

  const userId = auth.user?.id;
  const { data } = await supabase.from("user_info").select("id, my_language, learn_language").eq("id", userId).single();

  return data as UserInfoForMatching;
};

export const addToQueue = async (userId: string, myLanguage: string, learnLanguage: string) => {
  const supabase = createClient();

  return supabase
    .from("matches")
    .insert({ user_id: userId, match_id: null, my_language: myLanguage, learn_language: learnLanguage });
};

export const getExistingQueue = async (userId: string) => {
  const supabase = createClient();

  return supabase.from("matches").select("*").eq("user_id", userId).is("match_id", null);
};

export const findMatch = async (userId: string, learnLanguage: string) => {
  const supabase = createClient();

  return supabase
    .from("matches")
    .select("*")
    .is("match_id", null)
    .eq("my_language", learnLanguage)
    .neq("user_id", userId);
};

export const updateMatch = async (partnerUserId: string, matchId: string, roomId: string) => {
  const supabase = createClient();

  return supabase.from("matches").update({ match_id: matchId, room_id: roomId }).eq("user_id", partnerUserId);
};

export const removeUserFromQueue = async (userId: string) => {
  const supabase = createClient();

  return supabase.from("matches").delete().eq("user_id", userId);
};