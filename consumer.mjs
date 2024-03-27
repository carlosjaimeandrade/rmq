import amqp from "amqplib"

async function main() {
    const connection = await amqp.connect({
        hostname: "localhost",
        port: 5672,
        username: "rabbimtmq",
        password: "curso",
        vhost: "/"
    })

    await channel.assertQueue("minha_fila", { 
        durable: true 
    })

    //posso criar 2 canais
    const channel = await connection.createChannel()

    //consumindo a fila minha fila
    channel.consume("minha_fila", (data) => {
        console.log(data.content.toString())

        //removendo a mensagem da fila
        channel.ack(data)
    })
}

main()