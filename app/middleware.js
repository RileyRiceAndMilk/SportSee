export const handleNoUserData = (res, userData) => {
    if (!userData) {
        res.status(404);
        return res.json('can not get user');
    }

    return res.json({ data: userData });
};
