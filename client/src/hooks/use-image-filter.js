const useImageFilter = (RolesData, RoleObj, RoleImg) => {
  const isRoleData = RolesData.some((RoleData) => {
    return RoleData.teacher !== null;
  });

  //* Getting the RoleImg array.
  const RolesImg = RolesData.map((RoleData) => {
    return RoleData && RoleObj && RoleImg;
  });

  //* Filtering the RoleImg array
  const filteredRoleImg = RolesImg.filter((RoleImg) => RoleImg);

  //* Slicing the filteredImg's to 0 to 3 array size
  const sliceFilteredRolesImg = filteredRoleImg.slice(0, 3);

  return {
    isRoleData,
    filteredRoleImg,
    sliceFilteredRolesImg,
  };
};

export default useImageFilter;
