import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendreponse";
import { followServices } from "./follower.service";

const followReporterController = catchAsync(async (req, res) => {
  const followerId = req?.user?._id;
  const { reporter } = req.body;

  const response = await followServices.followReporterIntoDB(
    followerId,
    reporter,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reporter followed successfully",
    data: response,
  });
});

const unfollowReporterController = catchAsync(async (req, res) => {
  const followerId = req?.user?._id;
  const { reporterId } = req.params;

  const response = await followServices.unfollowReporterFromDB(
    followerId,
    reporterId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Reporter unfollowed successfully",
    data: response,
  });
});

const getReporterFollowersController = catchAsync(async (req, res) => {
  const { reporterId } = req.params;

  const response = await followServices.getReporterFollowersFromDB(
    reporterId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Followers retrieved successfully",
    data: response,
  });
});

const getFollowerCountController = catchAsync(async (req, res) => {
  const { reporterId } = req.params;

  const count = await followServices.getFollowerCountFromDB(
    reporterId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Follower count retrieved",
    data: { count },
  });
});

const checkIsFollowingController = catchAsync(async (req, res) => {
  const followerId = req?.user?._id;
  const { reporterId } = req.params;

  const isFollowing = await followServices.checkIsFollowingFromDB(
    followerId,
    reporterId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Follow status retrieved",
    data: { isFollowing },
  });
});

export const followControllers = {
  followReporterController,
  unfollowReporterController,
  getReporterFollowersController,
  getFollowerCountController,
  checkIsFollowingController,
};
