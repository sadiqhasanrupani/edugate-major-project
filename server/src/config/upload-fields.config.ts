/**
 * Centralized Upload Field Configuration
 * ------------------------------------------
 * Defines all upload fields for classroom entity
 */

export const UploadFieldConfigs = {
  classroom: [
    {
      name: "classroomBackgroundImg",
      folderPath: "images/classroom-banner-img",
      placeholderImg: "banner-placeholder.png",
    },
    {
      name: "classroomProfileImg",
      folderPath: "images/classroom-profile-img",
      placeholderImg: "profile-placeholder.png",
    },
  ],
  classroomUpdate: [
    {
      name: "bannerImg",
      folderPath: "images/classroom-banner-img",
      placeholderImg: "banner-placeholder.png",
    },
    {
      name: "profileImg",
      folderPath: "images/classroom-profile-img",
      placeholderImg: "profile-placeholder.png",
    },
  ],
  teacher: [
    {
      name: "updatedImg",
      folderPath: "images/user-profile",
      placeholderImg: "user-placeholder.png",
    },
  ],
  student: [
    {
      name: "updatedImg",
      folderPath: "images/user-profile",
      placeholderImg: "user-placeholder.png",
    },
  ],
};
