
const buildSearchParm = (dico, schema)=>{
    return Object.fromEntries(
    Object.entries(dico)
      .filter(([_, value]) => value != null && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string' && schema?.paths?.[key]?.instance === 'String') {
          return [key, { $regex: new RegExp(value, 'i') }];
        }
        return [key, value];
      })
  );
}
module.exports = { buildSearchParm };