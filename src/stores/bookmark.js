import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBookmarkStore = defineStore('bookmark', () => {
  const mentorBookmarks = ref([]);
  const partBookmarks = ref([]);

  function addMentorBookmark(mentor) {
    if (!mentorBookmarks.value.find(item => item.id === mentor.id)) {
      mentorBookmarks.value.push(mentor);
    }
  }

  function addPartBookmark(part) {
    if (!partBookmarks.value.find(item => item.id === part.id)) {
      partBookmarks.value.push(part);
    }
  }

  function removeMentorBookmark(mentorId) {
    mentorBookmarks.value = mentorBookmarks.value.filter(mentor => mentor.id !== mentorId);
  }

  function removePartBookmark(partId) {
    partBookmarks.value = partBookmarks.value.filter(part => part.id !== partId);
  }

  const isMentorBookmarked = (mentorId) => {
    return mentorBookmarks.value.some(mentor => mentor.id === mentorId);
  };

  const isPartBookmarked = (partId) => {
    return partBookmarks.value.some(part => part.id === partId);
  };

  return {
    mentorBookmarks,
    partBookmarks,
    addMentorBookmark,
    addPartBookmark,
    removeMentorBookmark,
    removePartBookmark,
    isMentorBookmarked,
    isPartBookmarked
  };
});
