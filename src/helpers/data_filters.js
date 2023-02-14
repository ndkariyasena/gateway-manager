const filterPeripheralData = (peripherals) => {
  return peripherals.map((item) => {
    const { uid, vendor, status, manufactured_date } = item;

    return { uid, vendor, status, manufactured_date };
  });
};

exports.filterDataFoResponse = (rawData) => {
  const data = JSON.parse(JSON.stringify(rawData));
  data.peripherals = filterPeripheralData(data.peripherals);

  return {
    serial_number: data.serial_number,
    name: data.name,
    ipv4_address: data.ipv4_address,
    peripherals: data.peripherals,
  };
};
