module.exports = {
	name: 'suges',
	description: 'Adiciona uma sugestão',
	execute(message, args, db) {
		const sql = 'CREATE TABLE IF NOT EXISTS sugg(id	TEXT,user	TEXT,title	TEXT,body	TEXT,anon	TEXT,date    TEXT)';
		db.run(sql);
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		console.log(id_number);
		const ID = `'SUG_${id_number}'`;
		const user = message.author.id;
		const title = args[0];
		const body = args[1];
		const anon = 'False';
		const date = new Date();
		const stringdate = date.toLocaleDateString();

		const write = db.prepare('INSERT INTO sugg VALUES(?, ?, ?, ?, ?, ?)');
		write.run(ID, user, title, body, anon, stringdate);
	},

};