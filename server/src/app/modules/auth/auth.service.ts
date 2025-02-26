import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
    const findUserData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });

    const userData: any = { ...findUserData }
    const isCorrectPassword: boolean = await bcrypt.compare(
        payload.password,
        userData.password
    );

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }

    const accessToken = jwtHelpers.generateToken(
        userData,
        config.jwt.jwt_access_secret as Secret,
        config.jwt.jwt_access_expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
        userData,
        config.jwt.jwt_refresh_secret as Secret,
        config.jwt.jwt_refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken,
    };
};



export const AuthServices = {
    loginUser,
};
