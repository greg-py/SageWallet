import express from "express";
import transactionsController from "../controllers/transactionsController";

const router = express.Router();

/**
 * @swagger
 * /api/users/{userId}/transactions:
 *   get:
 *     summary: Get all transactions for specified user.
 *     description: Get all transactions for specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID to get transactions for
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       '500':
 *         description: Internal server error
 */
router.get("/:userId/transactions", transactionsController.getUserTransactions);

/**
 * @swagger
 * /api/users/{userId}/transactions:
 *   post:
 *      summary: Add new transaction for specified user.
 *      description: Add new transaction for specified user.
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: User ID to add a transaction for
 *      requestBody:
 *        description: Transaction to add for user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                date:
 *                  type: string
 *                vendor:
 *                  type: string
 *                price:
 *                  type: number
 *                category:
 *                  type: string
 *      responses:
 *        '200':
 *          description: A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *        '500':
 *          description: Internal server error
 */
router.post("/:userId/transactions", transactionsController.addUserTransaction);

router.put(
  "/:userId/transactions/:transactionId",
  transactionsController.updateUserTransaction
);

router.delete(
  "/:userId/transactions/:transactionId",
  transactionsController.deleteUserTransaction
);

export default router;
