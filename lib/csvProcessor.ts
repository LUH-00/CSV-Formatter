
export interface CsvRecord {
  name: string;
  phone: string;
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function formatRecord(record: CsvRecord): string {
  const cleanPhone = cleanPhoneNumber(record.phone);
  return `${record.name.trim()}+${cleanPhone}`;
}

export function parseCsvContent(content: string): CsvRecord[] {
  const lines = content.split('\n').filter(line => line.trim());

  if (lines.length < 2) {
    throw new Error('O arquivo deve conter pelo menos um cabeçalho e uma linha de dados.');
  }

  const records: CsvRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(';').map(v => v.trim().replace(/^"|"$/g, ''));

    if (values.length < 2) {
      continue; 
    }

    const name = values[0]; 
    const phone = values[1]; 

    if (name && phone) {
      records.push({ name, phone });
    }
  }

  if (records.length === 0) {
    throw new Error('Nenhum registro válido encontrado no arquivo. Certifique-se de que o arquivo está no formato correto com dados separados por ponto e vírgula (;).');
  }

  return records;
}

export function processRecords(records: CsvRecord[]): string {
  const formattedRecords = records.map(formatRecord);
  return formattedRecords.join(',');
}
