import express from "express";
import transactionsController from "../controllers/transactionsController";
import budgetsController from "../controllers/budgetsController";
import dashboardController from "../controllers/dashboardController";
import incomeController from "../controllers/incomeController";
import balancesController from "../controllers/balancesController";
import teamController from "../controllers/teamController";
import { authorizeRequestUser } from "../middleware/auth";

const router = express.Router();

router.get(
  "/:userId/team-members",
  authorizeRequestUser,
  teamController.getUserTeamMember
);

router.get(
  "/:userId/filters",
  authorizeRequestUser,
  dashboardController.getUserFilters
);

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
  authorizeRequestUser,
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
  authorizeRequestUser,
  transactionsController.addUserTransaction
);

router.put(
  "/:userId/transactions/:transactionId",
  authorizeRequestUser,
  transactionsController.updateUserTransaction
);

router.delete(
  "/:userId/transactions/:transactionId",
  authorizeRequestUser,
  transactionsController.deleteUserTransaction
);

router.get(
  "/:userId/budgets",
  authorizeRequestUser,
  budgetsController.getUserBudgets
);

router.post(
  "/:userId/budgets",
  authorizeRequestUser,
  budgetsController.addUserBudgets
);

router.put(
  "/:userId/budgets/:budgetId",
  authorizeRequestUser,
  budgetsController.updateUserBudget
);

router.delete(
  "/:userId/budgets/:budgetId",
  authorizeRequestUser,
  budgetsController.deleteUserBudget
);

router.get(
  "/:userId/income",
  authorizeRequestUser,
  incomeController.getUserIncome
);

router.post(
  "/:userId/income",
  authorizeRequestUser,
  incomeController.addUserIncome
);

router.put(
  "/:userId/income/:incomeId",
  authorizeRequestUser,
  incomeController.updateUserIncome
);

router.delete(
  "/:userId/income/:incomeId",
  authorizeRequestUser,
  incomeController.deleteUserIncome
);

router.get(
  "/:userId/balances",
  authorizeRequestUser,
  balancesController.getUserBalances
);

router.post(
  "/:userId/balances",
  authorizeRequestUser,
  balancesController.addUserBalance
);

router.put(
  "/:userId/balances/:balanceId",
  authorizeRequestUser,
  balancesController.updateUserBalance
);

router.delete(
  "/:userId/balances/:balanceId",
  authorizeRequestUser,
  balancesController.deleteUserBalance
);

export default router;
