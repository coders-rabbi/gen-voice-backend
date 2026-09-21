import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { pollResponseServices } from "./poll-response.service";
import sendResponse from "../../utils/sendreponse";

const submitPollResponseController = catchAsync(async (req, res) => {
  const { id: pollId } = req.params;
  const { answers } = req.body;
  const respondentId = req.user?._id;

  const response = await pollResponseServices.submitPollResponse(
    pollId as string,
    answers,
    respondentId,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Response submitted successfully",
    data: response,
  });
});

const getPollAnalyticsController = catchAsync(async (req, res) => {
  const { id: pollId } = req.params;
  const response = await pollResponseServices.getPollAnalytics(
    pollId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Poll analytics retrieved successfully",
    data: response,
  });
});

export const pollResponseControllers = {
  submitPollResponseController,
  getPollAnalyticsController,
};
