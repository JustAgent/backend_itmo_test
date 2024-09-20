import { bookRepository, exchangeRequestRepository } from "../database/repositories/repositories.js";

const exchangeService = {
  createRequest: async (userId: number, offeredBookId: number, requestedBookId: number) => {
    const offeredBook = await bookRepository.findOneBy({ id: offeredBookId });
    const requestedBook = await bookRepository.findOneBy({ id: requestedBookId });

    if (!offeredBook || !requestedBook) throw new Error("User or books not found");

    const request = exchangeRequestRepository.create({
      creator: userId,
      requestedBook: requestedBook,
      offeredBook: offeredBook,
      status: "pending",
    });
    return await exchangeRequestRepository.save(request);
  },

  fulfillRequest: async (requestId: number, currentUserId: number) => {
    const exchangeRequest = await exchangeRequestRepository.findOne({
      where: { id: requestId },
      relations: ["requestedBook", "offeredBook"],
    });

    if (!exchangeRequest) {
      throw new Error("Exchange request not found");
    }
    if (exchangeRequest.requestedBook.owner !== currentUserId) {
      throw new Error("You do not own the requested book");
    }

    const maker = exchangeRequest.creator;
    const taker = exchangeRequest.requestedBook.owner;

    exchangeRequest.requestedBook.owner = maker;
    await bookRepository.save(exchangeRequest.requestedBook);

    exchangeRequest.offeredBook.owner = taker;
    await bookRepository.save(exchangeRequest.offeredBook);

    exchangeRequest.status = "fulfilled";
    await exchangeRequestRepository.save(exchangeRequest);

    return exchangeRequest;
  },

  listRequests: async () => {
    return await exchangeRequestRepository.find({
      relations: ["creator", "requestedBook", "offeredBook"],
    });
  },
};

export default exchangeService;
