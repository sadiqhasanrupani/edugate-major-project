const imagePathFilter = (path: string) => {
  return path && `${process.env.HOST_SITE}/${path.replace(/\\/g, "/")}`;
};

export default imagePathFilter;
