module.exports = {
	name: 'asuges',
	description: 'Adiciona uma sugestão anonima',
	execute(message, args, db, bcrypt, saltRounds) {
		const sql = 'CREATE TABLE IF NOT EXISTS sugg(id	TEXT,user	TEXT,title	TEXT,body	TEXT,anon	TEXT,date    TEXT)';
		db.run(sql);
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		console.log(id_number);
		const ID = `'SUG_${id_number}'`;
		const user = message.author.id;
		const title = args[0];
		const body = args[1];
		const anon = 'True';
		const date = new Date();
		const stringdate = date.toLocaleDateString();

		bcrypt.hash(user, saltRounds, function(err, hash) {
			// Store hash in your password DB.
			const write = db.prepare('INSERT INTO sugg VALUES(?, ?, ?, ?, ?, ?)');
		    write.run(ID, hash, title, body, anon, stringdate);
		});
	},

};