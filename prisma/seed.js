const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
	const createdCustomer = await prisma.customer.create({
		data: {
			name: "Alice",
			contact: {
				create: {
					phone: "1123",
					email: "tibor22@gmail.com",
				},
			},
		},
		include: { contact: true },
	});

	const createdMovie = await prisma.movie.create({
		data: {
			title: "Jackass",
			runtimeMins: 120,
		},
	});

    const createScreen1 = await prisma.screen.create({
        data: {
			number: 1,
		},
    })

    const createScreening = await prisma.screening.create({
        data: {
            startsAt:new Date('2022-06-07 13:00:00'),
            movieId: createdMovie.id,
            screenId: createScreen1.id,
		},
    })

    const createScreen2 = await prisma.screen.create({
        data: {
			number: 2,
		},
    })

  
    const createScreening1 = await prisma.screening.create({
        data: {
            startsAt:new Date('2022-06-07 13:00:00'),
            movieId: createdMovie.id,
            screenId: createScreen2.id,
		},
    })

    const createTicket = await prisma.ticket.create({
        data : {
            customerId: createdCustomer.id,
            screeningId: createScreening.id,
        }
  
    })
  


	console.log("Customer created", createdCustomer);



	// Add your code here


	// Don't edit any of the code below this line
	process.exit(0);
}

seed().catch(async (error) => {
	console.error(error);
	await prisma.$disconnect();
	process.exit(1);
});
