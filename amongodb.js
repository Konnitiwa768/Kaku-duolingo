const { MongoClient } = require('mongodb');

async function main() {
  const url = process.env.MONGODB_URL;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('MongoDBに接続しました');
    // ここでDB操作
  } catch (err) {
    console.error('接続エラー:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
