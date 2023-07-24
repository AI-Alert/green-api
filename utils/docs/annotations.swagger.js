/**
 * @swagger
 * tags:
 *   name: M1
 *   description: Microservice M1 API
 *
 * /sort:
 *   post:
 *     tags: [M1]
 *     summary: Sorts an array of numbers
 *     description: Accepts an array of numbers and sends it to Microservice M2 for sorting.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numbers:
 *                 type: array
 *                 description: Array of numbers to be sorted
 *                 items:
 *                   type: number
 *                 example: [5, 2, 8, 1, 4]
 *     responses:
 *       202:
 *         description: Accepted. The array sorting has started.
 *       400:
 *         description: Bad Request. The provided input is not a valid array of numbers.
 *       500:
 *         description: Internal Server Error. An error occurred while processing the array.
 */
