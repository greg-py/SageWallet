import express from "express";
import transactionsController from "../controllers/transactionsController";
import budgetsController from "../controllers/budgetsController";
import dashboardController from "../controllers/dashboardController";
import incomeController from "../controllers/incomeController";
import balancesController from "../controllers/balancesController";
import { checkUserId } from "../middleware/checkJwt";

const router = express.Router();

router.get("/:userId/filters", checkUserId, dashboardController.getUserFilters);

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
router.get(
  "/:userId/transactions",
  checkUserId,
  transactionsController.getUserTransactions
);

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
router.post(
  "/:userId/transactions",
  checkUserId,
  transactionsController.addUserTransaction
);

router.put(
  "/:userId/transactions/:transactionId",
  checkUserId,
  transactionsController.updateUserTransaction
);

router.delete(
  "/:userId/transactions/:transactionId",
  checkUserId,
  transactionsController.deleteUserTransaction
);

router.get("/:userId/budgets", checkUserId, budgetsController.getUserBudgets);

router.post("/:userId/budgets", checkUserId, budgetsController.addUserBudgets);

router.put(
  "/:userId/budgets/:budgetId",
  checkUserId,
  budgetsController.updateUserBudget
);

router.delete(
  "/:userId/budgets/:budgetId",
  checkUserId,
  budgetsController.deleteUserBudget
);

router.get("/:userId/income", checkUserId, incomeController.getUserIncome);

router.post("/:userId/income", checkUserId, incomeController.addUserIncome);

router.put(
  "/:userId/income/:incomeId",
  checkUserId,
  incomeController.updateUserIncome
);

router.delete(
  "/:userId/income/:incomeId",
  checkUserId,
  incomeController.deleteUserIncome
);

router.get(
  "/:userId/balances",
  checkUserId,
  balancesController.getUserBalances
);

router.post(
  "/:userId/balances",
  checkUserId,
  balancesController.addUserBalance
);

router.put(
  "/:userId/balances/:balanceId",
  checkUserId,
  balancesController.updateUserBalance
);

router.delete(
  "/:userId/balances/:balanceId",
  checkUserId,
  balancesController.deleteUserBalance
);

export default router;
