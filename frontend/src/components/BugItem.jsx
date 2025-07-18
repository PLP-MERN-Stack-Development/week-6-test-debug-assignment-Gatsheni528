const onStatusChange = async (id) => {
  await updateBugStatus(id);
  // then refresh bugs state
};

const onDelete = async (id) => {
  await deleteBug(id);
  // then refresh bugs state
};
