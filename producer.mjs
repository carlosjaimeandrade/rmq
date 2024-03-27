import amqp from "amqplib"

async function main() {
    const connection = await amqp.connect({
        hostname: "localhost",
        port: 5672,
        username: "rabbimtmq",
        password: "curso",
        vhost: "/"
    })

    //posso criar 2 canais
    const channel = await connection.createChannel()

    // criar filas
    await channel.assertQueue("minha_fila", { 
        durable: true 
    })

    //enviando mensagem para fila, primeiro parametro é o exchanges como não tem sera enviado para o default
    //channel.publish("", "minha_fila", Buffer.from("minha mensagem publish"))
    channel.sendToQueue("minha_fila", Buffer.from("minha mensagem, por sendToQueue") )

    await channel.close()

    await connection.close()
}

main()