const imagePathFilter = (path: string) => {
  const modifiedPath = `${process.env.HOST_SITE}/${path
    .replace(/\\/g, "/")
    .replace(/^public\//, "")}`;

  return modifiedPath;
};

export default imagePathFilter;
